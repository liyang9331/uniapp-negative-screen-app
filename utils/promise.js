
/**
 * 创建一个可终止的 Promise 对象
 * @param {Function} fetchPromise
 * 去除对象属性值为特点值的属性
 * @return {PromiseAll}
 */
export function createPromiseCanAbort(fetchPromise) { 
  let abort = null
  const abortPromise = new Promise((resolve, reject) => {
    abort = () => reject('abort')
  })
  let promiseCanAbort = Promise.race([fetchPromise, abortPromise])
  promiseCanAbort.abort = abort
  return promiseCanAbort
}

// 终止未完成的 Promise 对象
export function abortPromise(promiseCanAbort) { 
  if (promiseCanAbort != null && promiseCanAbort.abort) {
    promiseCanAbort.abort();
	return true;
  }
}