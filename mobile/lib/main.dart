import 'package:flutter/material.dart';
import 'screen/current.dart';
import 'screen/forecast.dart';
import 'screen/history.dart';

void main() => runApp(WeatherAppRoot());

class WeatherAppRoot extends StatelessWidget {
  final navigatorKey = GlobalKey<NavigatorState>();

  final pagesRouteFactories = {
    "/": () => MaterialPageRoute(
          builder: (context) => Center(
            child: ScreenCurrent()
          ),
        ),
    "/forecast": () => MaterialPageRoute(
          builder: (context) => Center(
            child: ScreenForecast()
          ),
        ),
    "/history": () => MaterialPageRoute(
          builder: (context) => Center(
            child: ScreenHistory()
          ),
        ),
  };

  _buildBottomNavbarItem(name, icon) => BottomNavigationBarItem(
      icon: Icon(icon), title: Text(name), backgroundColor: Colors.black45);

  @override
  Widget build(BuildContext context) => MaterialApp(
        home: Scaffold(
          body: MaterialApp(
              navigatorKey: navigatorKey,
              onGenerateRoute: (route) => pagesRouteFactories[route.name]()),
          bottomNavigationBar: BottomNavigationBar(
            items: [
              _buildBottomNavbarItem("Current", Icons.calendar_today),
              _buildBottomNavbarItem("Forecast", Icons.calendar_view_day),
              _buildBottomNavbarItem("History", Icons.history)
            ],
            onTap: (routeIndex) => navigatorKey.currentState
                .pushNamed(pagesRouteFactories.keys.toList()[routeIndex]),
          ),
        ),
      );
}
