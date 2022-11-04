import "../css/cropper.css"
import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import { MenuItem, ContextMenuTrigger, ContextMenu, hideMenu } from "react-contextmenu";
import PropTypes from 'prop-types';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop'
import { connect } from 'react-redux';
import * as canvasPreview from "./canvasPreview";
import { useDispatch } from 'react-redux';


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

export const Cropper = ({ mouseFlag, onSaveLabel, fakeDummyData, LabalList }) => {
    const containerRef = useRef();
    const inputClassNameRef = useRef();
    const cropperImgRef = useRef(null);
    const imageRef = useRef();
    const [imageSize, setImage] = useState();
    const [show, setShow] = useState(false);
    const [contextMenuBoxOut, setcontextMenuBoxOut] = useState({
        contextMenuVisibility: false,
        contextMenuTop: 0,
        contextMenuLeft: 0,
    });
    const dispatch = useDispatch();
    const guid_create = () => {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = ((d + Math.random() * 16) % 16) | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    const [crop, setCrop] = useState()
    const imgRef = useRef(null)
    const [aspect, setAspect] = useState(16 / 9)
    const [scale, setScale] = useState(1)

    const [completedCrop, setCompletedCrop] = useState()
    const previewCanvasRef = useRef(null)

    const [rotate, setRotate] = useState(0)

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

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                canvasRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview.CanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
                console.log(completedCrop)
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    const copyCoupon = (e, data) => {
        var coupon = data.copy
        console.log(e)
        setShow(true)
        // navigator.clipboard.writeText(coupon)
        // alert(`Coupon code ${e} copied to your clipboard`)
    }

    const canvas = useRef(null);
    const [ctx, setCts] = useState(undefined);

    const [isMouseDown, setIstMouseDown] = useState(false);
    useEffect(() => {
        // @ts-ignore
        // setCts(canvasRef.current.getContext('2d'));
    }, []);
    const handleMouseMove = e => {
        if (ctx) {
            var rect = canvas.current.getBoundingClientRect();
            ctx.fillStyle = 'black';
            ctx.fillRect(e.clientX - rect.left, e.clientY - rect.top, 10, 10);
            // ctx.fillRect(25, 25, 100, 100);
            // ctx.clearRect(45, 45, 60, 60);
            ctx.strokeRect(50, 50, 50, 50);
        }
    };

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(fakeDummyData)
        if (!canvasRef) return;
        if (!fakeDummyData) return;
        const ctx = canvasRef.current.getContext("2d");
        const image = new Image();
        // image.src = "https://dummyjson.com/image/i/products/1/thumbnail.jpg";
        // image.src = imgUrl;
        console.log(image)
        console.log(fakeDummyData)
        ctx.drawImage(image, 0, 0);
        // ctx.save();
        // if (LabalList) {
        //     LabalList.forEach(i => {
        //         console.log(i)
        //         ctx.strokeStyle = "red";
        //         ctx.lineWidth = 3;
        //         ctx.strokeRect(i['x'], i['y'], i['width'], i['height']);

        //         // Text 처리 
        //         ctx.textBaseline = 'top';
        //         ctx.font = "13px Verdana";
        //         ctx.fillStyle = "white";
        //         ctx.fillText(i.name, i.x, i.y + i.height + 5);
        //         ctx.fill();
        //     });
        // }
        // ctx.restore();
    }, [canvasRef, fakeDummyData, LabalList]);
    useEffect(() => {
        console.log(fakeDummyData)
    }, [fakeDummyData]);

    const addinputClass = (eve) => {
        if (eve.charCode === 13) {
            console.log(completedCrop)
            let x1 = completedCrop.x;
            let y1 = completedCrop.y;
            let x2 = completedCrop.x + completedCrop.width;
            let y2 = completedCrop.y + completedCrop.height;
            // ctx.strokeRect(x1, y1, completedCrop.width, completedCrop.height);
            let list = [inputClassNameRef.current.value, x1, y1, completedCrop.width, completedCrop.height];
            // dispatch(imgAction.onSaveLabel(list))
        }
    }

    return (
        <>
            <div>
                <div style={{ width: '100%' }} >
                    <ContextMenuTrigger id="contextmenu" >
                        <div className="cropper-container">
                            <ReactCrop
                                ref={cropperImgRef}
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop) & hideMenu()}
                                onComplete={(c) => setCompletedCrop(c) & setShow(false)}
                                aspect={aspect}
                            >
                                <canvas style={{ width: '100%' }} ref={canvasRef} />
                            </ReactCrop>
                        </div>
                    </ContextMenuTrigger>
                </div>
                {
                    show && (
                        <input ref={inputClassNameRef} onKeyPress={addinputClass} type="text" className="input-tagging" placeholder="라벨명 작성" />
                    )
                }
                <ContextMenu id="contextmenu">
                    <MenuItem data={{ copy: 'MI50' }} onClick={copyCoupon}>
                        <span>라벨링</span>
                    </MenuItem>
                </ContextMenu>
            </div>
        </>
    );
}

Cropper.propTypes = {
    imgIndex: PropTypes.number,
    // imgUrl: PropTypes.string,
    onSliderImage: PropTypes.func,
    onSaveLabel: PropTypes.func,
    mouseFlag: PropTypes.string,
    // LabalList: PropTypes.array
}

Cropper.defaultProps = {
    imgIndex: 0,
    // imgUrl: "",
    onSliderImage: () => { },
    onSaveLabel: () => { },
    mouseFlag: "0",
    // LabalList: []
};

export default connect(
    state => ({
        imgIdx: state.imgList.imgIdx,
        name: state.imgList.name,
        mouseFlag: state.user.mouseStatus,
        LabalList: state.imgList.LabalList,
        imgBase64Str: state.imgList.imgBase64Str,
        fakeDummyData: state.imgList.fakeDummyData,
    })
)(Cropper)



