class WeatherResponce {
  dynamic responce;
  // constructor
  WeatherResponce({this.responce});

  factory WeatherResponce.fromJson(Map<String, dynamic> json) {
    return new WeatherResponce(
      responce: json,
    );
  }
}
