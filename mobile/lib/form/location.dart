import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:http/http.dart' as http;
import "package:weather/openweathermap/client.dart";

/**
 * 
 */
class LocationForm extends StatefulWidget {
  LocationForm({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _LocationFormState createState() => _LocationFormState();
}

/**
 * 
 */
class _LocationFormState extends State<LocationForm> {
  Future<LocationResponce> futureLocationResponce;
  Future<WeatherResponce> futureWeatherResponce;
  final _formKey = GlobalKey<FormState>();

// Autocomplite field
  TypeAheadField locationInputElement(context) {
    return TypeAheadField(
      textFieldConfiguration: TextFieldConfiguration(
          autofocus: true,
          style: DefaultTextStyle.of(context)
              .style
              .copyWith(fontStyle: FontStyle.italic),
          decoration: InputDecoration(border: OutlineInputBorder())),
      suggestionsCallback: (pattern) async {
        // поиск по вводу символа
        futureFetchLocation(pattern);
      },
      itemBuilder: (context, suggestion) {
        return ListTile(
          leading: Icon(Icons.shopping_cart),
          title: Text(suggestion['name']),
          // subtitle: Text('\$${suggestion['price']}'),
          subtitle: Text('ывфы'),
        );
      },
      onSuggestionSelected: (suggestion) {
        // Navigator.of(context).push(MaterialPageRoute(
        // builder: (context) => ProductPage(product: suggestion)));
      },
    );
  }

  IconButton searchButtonElement() {
    return IconButton(
      icon: Icon(Icons.search),
      tooltip: 'GetWeather',
      onPressed: () {
        futureWeatherResponce = futureFetchWeather();
      },
    );
  }

  // const LocationForm({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            locationInputElement(context),
            searchButtonElement()
          ]),
    );
  }
}

/**
 * 
 */
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

/**
 * 
 */
Future<WeatherResponce> futureFetchWeather() async {
  Uri uri = OpenWeatherMapClient().buildRequest("weather", "Moscow,ru");
  // print(uri);
  final response = await http.get(uri.toString());

  if (response.statusCode == 200) {
    print(response.body);
    return WeatherResponce(responce: response.body);
  }
  throw Exception('Failed to fetch weather');
}

/**
 * 
 */
class LocationResponce {
  dynamic responce;
  // constructor
  LocationResponce({this.responce});

  factory LocationResponce.fromJson(Map<String, dynamic> json) {
    return new LocationResponce(
      responce: json,
    );
  }
}

/**
 *
 */
Future<LocationResponce> futureFetchLocation(String pattern) async {
  Uri uri = Uri(
      scheme: "http",
      host: "192.168.50.52",
      port: 8000,
      path: "/api/weather/autocomplite/location");

  print(uri);
  final response = await http.post(uri.toString(), body: {'location': pattern});

  if (response.statusCode == 200) {
    print(response.body);
    return LocationResponce(responce: response.body);
  }

  throw Exception('Failed to fetch suggetion');
}
