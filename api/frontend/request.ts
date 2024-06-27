// type ResponseType = 'json' | 'blob'
//
// type RequestCommonOptions = {
//     includeCredentials?: boolean
//     headers?: Record<string, string>
// }
//
// type GetRequestOptions = RequestCommonOptions
//
// export const getRequest = async <T>(
//     url: string,
//     options: GetRequestOptions = {}
// ): Promise<T> => {
//     const response = await fetch(url, {
//         headers: options.headers,
//         credentials: options.includeCredentials ? 'include' : 'omit',
//     })
// }
//
// export const putRequest = async <T>(url: string): Promise<T> => {
//     const response = await fetch(url)
// }
