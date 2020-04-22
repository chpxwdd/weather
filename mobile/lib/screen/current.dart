import 'package:flutter/material.dart';
import '../form/location.dart';

class ScreenCurrent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Current Screen title"),
      ),
      body: Center(
        child: LocationForm(),
      ),
    );
  }
}