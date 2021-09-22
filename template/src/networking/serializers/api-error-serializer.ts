class ApiErrorSerializer {
  static deSerialize(data: RawApiError) {
    return {
      code: data.code || null,
      message: data.message || null,
    };
  }
}

export { ApiErrorSerializer };
