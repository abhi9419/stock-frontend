export class ApiUrlService {

  private useApiPrefix = true;
  private baseUrl = 'http://127.0.0.1:8000/';

  getBaseUrl() {
    return this.useApiPrefix ? this.baseUrl + 'api/' : this.baseUrl;
  }


}
