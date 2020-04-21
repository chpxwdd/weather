import 'package:flutter/material.dart';

class ScreenForecast extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Forecast Screen title"),
      ),
      body: Center(
        child: Text("Forecast Screen body"),
      ),
    );
  }
}