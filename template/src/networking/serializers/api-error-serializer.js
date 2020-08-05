class ApiErrorSerializer {
  static deSerialize(data) {
    return {
      code: data.code || null,
      message: data.message || null,
    };
  }
}

export { ApiErrorSerializer };
