import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:http/http.dart' as http;


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


Future<LocationResponce> fetchLocation(pattern) async {
  final String baseUrl = 'http://192.168.1.52:8000/api/weather/autocomplite/location';
  final response = await http.post(baseUrl, body: {'location': pattern});

  if (response.statusCode == 200) {
    // print(response.body);
    return LocationResponce(responce: response.body);
  } else {
    throw Exception('Failed to fetch suggetion');
  }
}


class LocationForm extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();

  // const LocationForm({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TypeAheadField(
            textFieldConfiguration: TextFieldConfiguration(
                autofocus: true,
                style: DefaultTextStyle.of(context)
                    .style
                    .copyWith(fontStyle: FontStyle.italic),
                decoration: InputDecoration(border: OutlineInputBorder())),
            suggestionsCallback: (pattern) async {
              fetchLocation(pattern);
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
          )
        ],
      ),
    );
  }
}
