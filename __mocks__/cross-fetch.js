const crossFetch = jest.genMockFromModule('cross-fetch');

function fetch(url, {method,body,headers}) {

	return new Promise((resolve, reject) => {
//		process.nextTick(
//			() => (
//				resolve(() => {
//						TODO: Return some valid json
//					}}
//				)
////					: reject(
////					{
////						error: 'User with ' + userID + ' not found.'
////					}
////				)
//			)
//		);
	});
}
crossFetch.fetch = fetch
export default crossFetch
