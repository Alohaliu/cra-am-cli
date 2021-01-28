import React from 'react';
import Loadable from 'react-loadable';
import './index.less';
export const Loading:React.FC = () =>{
  return (
    <div className='loading-wrap'>
      <div className='progress-bar'></div>
      <div className='title'></div>
    </div>
  );
};
export default (importLoader:React.Component | React.ReactNode):React.Component=>{
  return Loadable({
    loader: importLoader,
    loading() {
      return (<Loading/>);
    }
  });
};
