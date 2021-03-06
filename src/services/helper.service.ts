class HelperService {
  convertUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const id = match && match[2].length === 11 ? match[2] : '';
    return `https://youtube.com/embed/${id}`;
  }
}

const helperService = new HelperService();
export default helperService;
