class OpenWeatherMapClient {
  final String apiKey = "c15053e7a024be38ee66e8c9cc995324";
  final String apiHost = "api.openweathermap.org";
  final String apiPath = "data/2.5/";
  final String apiProtocol = "https";
  final int apiPort = 443;

  final Map<String, dynamic> defaultOptions = {
    "appid": "c15053e7a024be38ee66e8c9cc995324",
    "mode": "json",
    "lang": "en",
    "units": "metric"
  };

  Uri buildRequest(String method, String q) {

    Map<String, dynamic> params = {"q": q};
    params.addAll(this.defaultOptions);

    return new Uri(
        scheme: this.apiProtocol,
        host: this.apiHost,
        port: this.apiPort,
        path: this.apiPath + method,
        queryParameters: params);
  }
}
