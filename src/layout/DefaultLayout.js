import { AppSidebar, AppHeader } from '../layout/index'
import AppContent from '../pages/AppContent'
import * as imgAction from '../modules/_actions/img_action';
import React, { useEffect } from 'react';
import * as useAction from '../modules/_actions/user_action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export const DefaultLayout = ({ imgIdx, name, mouseFlag, LabalList, imgBase64Str, imgAction, useAction, fakeDummyData }) => {

  useEffect(() => {
    imgAction.onInitFakeDataList()
  }, [])

  const handleChangeMouseAct = value => {
    useAction.sideMenuHandle(value)
  }

  return (
    <div>
      <AppHeader />
      <div style={{ width: '100%', display: 'flex' }}>
        <AppSidebar onClickMouseAct={handleChangeMouseAct} mouseFlag={mouseFlag} />
        <div style={{ width: '100%' }} >
          <AppContent imgUrl={fakeDummyData} />
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    imgIdx: state.imgList.imgIdx,
    name: state.imgList.name,
    mouseFlag: state.user.mouseStatus,
    LabalList: state.imgList.LabalList,
    imgBase64Str: state.imgList.imgBase64Str,
    fakeDummyData: state.imgList.fakeDummyData,

  }),
  dispatch => ({
    useAction: bindActionCreators(useAction, dispatch),
    imgAction: bindActionCreators(imgAction, dispatch),
  })
)(DefaultLayout)

