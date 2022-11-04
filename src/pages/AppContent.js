import React, { useEffect, useState, useRef, useMemo } from 'react'
import { bindActionCreators } from 'redux';
import * as imgAction from '../modules/_actions/img_action';
import "../css/cropper.css"
import { MenuItem, ContextMenuTrigger, ContextMenu, hideMenu } from "react-contextmenu";
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { centerCrop, makeAspectCrop, } from 'react-image-crop'
import { connect } from 'react-redux';
import * as CanvasDrawing from "../component/canvasDrawing";
import styled from 'styled-components';


export function useDebounceEffect(
  fn,
  waitTime,
  deps,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}

const mouseFlagHandle = (mouseFlag) => {
  return mouseFlag === "0" ? true : false;
}

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const DivContainer = styled.div`
  position: absolute;
  width: 100px;
  height: 30px;
  display: flex;
  ${(props) => `
  top: ${props.top || 0}px;
  left: ${props.left || 0}px;
  `}
`;

export const AppContent = ({ imgUrl, LabalList, mouseFlag }) => {

  const mouseflag = useMemo(() => mouseFlagHandle(mouseFlag), [mouseFlag]);
  const inputClassNameRef = useRef();
  const canvasRef = useRef(null);
  const cropperImgRef = useRef(null);
  const [imageSize, setImage] = useState();
  const [show, setShow] = useState(false);
  const [crop, setCrop] = useState()
  const [aspect, setAspect] = useState(16 / 9)
  const [completedCrop, setCompletedCrop] = useState()

  const onImageLoad = e => {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
      setImage({
        width: e.width,
        height: e.height,
      });
    }
  }

  useEffect(() => {
    if (!canvasRef) return;
    if (!imgUrl) return;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image();
    ctx.drawImage(image, 0, 0, 100, 100);
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    // image.src = 'https://loremflickr.com/500/500/cat';
    image.src = imgUrl;
  }, [canvasRef, imgUrl]);

  useDebounceEffect(
    async () => {
      if (LabalList && LabalList.length) {
        LabalList.forEach(i => {
        });
      }
    },
    100,
    [LabalList],
  )

  const addinputClass = (eve) => {
    if (eve.charCode === 13) {
      var color = getRandomColor()
      var name = inputClassNameRef.current.value;
      CanvasDrawing.CanvasDrawing(
        crop,
        canvasRef,
        name,
        color
      )
      setShow(false)
      // var list = {
      //   name: name,
      //   x: x,
      //   y: y,
      //   w: w,
      //   h: h
      // }
      // dispatch(imgAction.onSaveLabel(list))
    }
  }

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  const saveTextBtn = (e, data) => {
    setShow(true)
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();

  }
  return (
    <>
      <div>
        <div style={{ width: '100%' }} >
          <ContextMenuTrigger id="contextmenu"
            disabled={mouseflag}>
            <div className="cropper-container">
              <ReactCrop
                ref={cropperImgRef}
                crop={crop}
                disabled={mouseflag}
                onChange={(_, percentCrop) => setCrop(percentCrop) & hideMenu()}
                onComplete={(c) => setCompletedCrop(c) & setShow(false)}
                aspect={aspect}
                onImageLoaded={onImageLoad}
                onLoad={onImageLoad}
              >
                <canvas style={{ width: '100%' }} ref={canvasRef}
                />
              </ReactCrop>
            </div>
          </ContextMenuTrigger>
        </div>
        {
          show && (
            <DivContainer top={cropperImgRef.current.evData.clientY} left={cropperImgRef.current.evData.clientX}>
              <input ref={inputClassNameRef} onKeyPress={addinputClass} type="text" placeholder="라벨명 작성" />
            </DivContainer>
          )
        }
        <ContextMenu id="contextmenu" disabled={mouseflag}>
          <MenuItem data={{ copy: 'MI50' }} onClick={saveTextBtn} disabled={mouseflag}>
            <span>라벨링</span>
          </MenuItem>
        </ContextMenu>
      </div>
    </>
  )
}


export default connect(
  state => ({
    mouseFlag: state.user.mouseStatus,
    LabalList: state.imgList.LabalList,
  }),
  dispatch => ({
    imgAction: bindActionCreators(imgAction, dispatch),
  })
)(AppContent)