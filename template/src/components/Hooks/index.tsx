import { useEffect } from 'react';

export const useDocumentTitle = (title:string) => {
  useEffect(
    () => {
      document.title = title;
      return () => (document.title = '');
    },[title]
  );
};
// export const useFetch = (request:(p:object) => Promise<{}>, param:object={},defaultData:any) => {
// }
