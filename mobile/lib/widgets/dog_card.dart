import 'package:read-and-watch/models/dog.dart';
import 'package:read-and-watch/screens/dog_details_page.dart';
import 'package:flutter/material.dart';

class DogCard extends StatefulWidget {
  final Item dog;

  DogCard(this.dog);

  @override
  DogCardState createState() {
    return new DogCardState(dog);
  }
}

class DogCardState extends State<DogCard> {
  Item dog;
  String renderUrl;

  DogCardState(this.dog);

  void initState() {
    super.initState();
    renderDogPic();
  }

  void renderDogPic() async {
    await dog.getImageUrl();
    setState(() {
      renderUrl = dog.imageUrl;
    });
  }

  Widget get dogImage {
    var dogAvatar = new Hero(
      tag: dog,
      child: new Container(
        width: 72.0,
        height: 108.0,
        decoration: new BoxDecoration(
          color: Color(0xffB6BAE7),
          shape: BoxShape.rectangle,
          borderRadius: new BorderRadius.only(
              topLeft: Radius.circular(8.0), bottomLeft: Radius.circular(8.0)),
        ),
      ),
    );

    var placeholder = new Container(
      width: 100.0,
      height: 128.0,
      decoration: new BoxDecoration(
        shape: BoxShape.circle,
        gradient: new LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Colors.black54, Colors.black, Colors.blueGrey[600]],
        ),
      ),
      alignment: Alignment.center,
      child: new Text(
        'DOGGO',
        textAlign: TextAlign.center,
      ),
    );

    var crossFade = new AnimatedCrossFade(
      firstChild: placeholder,
      secondChild: dogAvatar,
      crossFadeState: renderUrl == null
          ? CrossFadeState.showFirst
          : CrossFadeState.showSecond,
      duration: new Duration(milliseconds: 1000),
    );

    return crossFade;
  }

  Widget get dogCard {
    return new Positioned(
      right: 0.0,
      child: new Container(
        width: 364.0,
        height: 108.0 + 8.0,
        child: new Card(
          color: Colors.white,
          child: new Padding(
            padding: const EdgeInsets.only(
              top: 8.0,
              bottom: 8.0,
              left: 90.0,
            ),
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                new Text(
                  widget.dog.name,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.w600),
                ),
                new Text(
                  widget.dog.location,
                  style: TextStyle(color: Colors.black),
                ),
                new Row(
                  children: <Widget>[
                    new Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: Color(0xffB6BAE7),
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(4.0)),
                      ),
                      child: new Padding(
                        padding: EdgeInsets.all(4.0),
                        child: new Text(
                          'Drama',
                          style: TextStyle(color: Color(0xffB6BAE7)),
                        ),
                      ),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new InkWell(
      onTap: () => showDogDetailPage(),
      child: new Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 16.0,
          vertical: 8.0,
        ),
        child: new Container(
          height: 116.0,
          child: new Stack(
            children: <Widget>[
              dogCard,
              new Positioned(
                top: 4.0,
                child: dogImage,
              ),
            ],
          ),
        ),
      ),
    );
  }

  showDogDetailPage() {
    Navigator.of(context).push(new MaterialPageRoute(
      builder: (context) {
        return new DogDetailPage(dog);
      },
    ));
  }
}
