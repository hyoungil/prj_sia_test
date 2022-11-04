import React from 'react';
import cursorImg from '../assets/Toolbar_select@2x.png';
import frameImg from '../assets/Bounding_Box_Create@2x.png';
import '../css/sidebar.css';

const AppSidebar = ({ onClickMouseAct, mouseFlag }) => {

  return (
    <>
      <div className='sideMenu'>
        <div className={[
          'unitMenu',
          mouseFlag == "0" ? 'unitMenuAct' : '',
        ].join(' ')}>
          <img src={cursorImg} alt="포인트" onClick={() => onClickMouseAct("0")} />
        </div>
        <div className={[
          'unitMenu',
          mouseFlag == "1" ? 'unitMenuAct' : '',
        ].join(' ')}>
          <img src={frameImg} alt="그룹" onClick={() => onClickMouseAct("1")} />
        </div>
      </div>
    </>
  )
}

export default React.memo(AppSidebar)




// import React from 'react';
// import cursorImg from '../assets/Toolbar_select@2x.png';
// import frameImg from '../assets/Bounding_Box_Create@2x.png';

// export const SideMenu = ({ onClickMouseAct, mouseFlag }) => {
//   return (
//     <>
//       <div className={[
//         'unitMenu',
//         mouseFlag == "0" ? 'unitMenuAct' : '',
//       ].join(' ')}>
//         <img src={cursorImg} alt="포인트" onClick={() => onClickMouseAct("0")} />
//       </div>
//       <div className={[
//         'unitMenu',
//         mouseFlag == "1" ? 'unitMenuAct' : '',
//       ].join(' ')}>
//         <img src={frameImg} alt="그룹" onClick={() => onClickMouseAct("1")} />
//       </div>
//     </>
//   );
// };

// export default SideMenu;
