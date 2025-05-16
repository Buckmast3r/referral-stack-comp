export function errorResponse(message: string, details?: any) {
  return { success: false, message, details };
}

export function successResponse(data: any, message: string = 'Success') {
  return { success: true, message, data };
}
