// import {useState,useEffect} from 'react';
// export const useFetch = (config, deps) => {
//   const abortController = new AbortController()
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState()
//   useEffect(() => {
//     setLoading(true)
//     fetch({
//       ...config,
//       signal: abortController.signal
//     }).then((res) => setResult(res))
//     .finally(() => setLoading(false))
//   }, deps);
//   useEffect(() => {
//     return () => abortController.abort()
//   }, [])
//   return { result, loading }
// }
