import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:type_rush/providers/game_state_provider.dart';
import 'package:type_rush/screens/create_roomscreen.dart';
import 'package:type_rush/screens/game_screen.dart';
import 'package:type_rush/screens/home_screen.dart';
import 'package:type_rush/screens/join_roomscreen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
            create: (context) => 
                  GameStateProvider(),
                )
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Type Rush',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => const HomeScreen(),
          '/create-room': (context) => const CreateRoomScreen(),
          '/join-room': (context) => const JoinRoomScreen(),
          '/game-screen': (context) => const GameScreen(),
        },
      ),
    );
  }
}
