function mapZodMessages(errData: Array<any>) {
  const errMessageData = errData.map((err) => {
    return {
      message: err.message,
      code: err.code,
      field: err.path[0],
    };
  });
  return errMessageData;
}

export { mapZodMessages };
