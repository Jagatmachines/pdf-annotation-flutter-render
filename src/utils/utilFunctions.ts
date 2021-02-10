export const isPdf = (fileName: string) => {
    const ext = fileName.split('.').pop();
    if (ext) {
      return ext.toLocaleLowerCase() === 'pdf';
    }
    return false;
  };