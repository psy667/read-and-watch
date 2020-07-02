import 'package:read-and-watch/screens/new_dog_form.dart';
import 'package:read-and-watch/widgets/dogs_list.dart';
import 'package:flutter/material.dart';

import 'models/dog.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Read And Watch',
      theme: ThemeData(brightness: Brightness.dark),
      home: MyHomePage(title: 'Read And Watch'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var initialDoggos = <Item>[]
    ..add(Item('The Wolf Of Wall Street', 'Martin Scorsese',
        'Ruby is a very good girl. Yes: Fetch, loungin\'. No: Dogs who get on furniture.'))
    ..add(Item('The Great Gatsby', 'Baz Luhrmann', 'A Very Good Boy'))
    ..add(Item('The Hunger Games', 'Gary Ross', 'A Very Good Boy'))
    ..add(Item('The Avengers', 'Joss Whedon', 'A Very Good Boy'))
    ..add(Item('Buddy', 'North Pole, Earth', 'A Very Good Boy'));

  Future<Null> _showNewDogForm() async {
    Item newDog = await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) {
          return AddDogFormPage();
        },
      ),
    );
    if (newDog != null) {
      initialDoggos.add(newDog);
    }
  }

  @override
  Widget build(BuildContext context) {
    var key = GlobalKey<ScaffoldState>();
    return Scaffold(
      key: key,
      appBar: AppBar(
        backgroundColor: Colors.black87,
        title: Text(widget.title),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => _showNewDogForm(),
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(color: Color(0xFFE7E8F4)),
        child: Center(
          child: DogList(initialDoggos),
        ),
      ),
    );
  }
}
