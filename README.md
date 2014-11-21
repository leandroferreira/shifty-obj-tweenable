# ShiftyObjTweenable

Lightweight Timeline and Tweenable library on top of [Shifty](https://github.com/jeremyckahn/shifty), based heavily on Zain Manji's [ShiftyTimelineAnimation](https://github.com/ZainManji/ShiftyTimelineAnimation).

## Documentation

Both the ObjTweenable object and the Timeline object extend from Shifty's Tweenable.
[Shifty's API](http://jeremyckahn.github.io/shifty/dist/doc/classes/Tweenable.html)

#### ObjTweenable(element, config)
Constructor for a ObjTweenable object.<br>
Takes as param an object and a tween config.
```javascript
// When tweening, the properties from the tween config get applied to the element.
var myObject = {x:0};
var ObjTweenable = new ObjTweenable(
                        myObject,
                        {from: {x:0}, to: {x:1}, duration: 1000}
                  );
```

#### ObjTweenable.seek(millisecond)
Move the state of the animation to a specific point in the ObjTweenable tween's timeline.<br>
The properties at the specified point will be applied to the element.
```javascript
// Move the state of the animation to the 400ms point in the tween's timeline
ObjTweenable.seek(400);
```

#### Timeline(config)
Constructor for a Timeline object.<br>
Takes as param a config (optional).
```javascript
// Create a timeline to place ObjTweenable objects on.
var timeline = new Timeline({duration: 200});
```

#### Timeline.add(ObjTweenable, millisecond)
Add a ObjTweenable object to the Timeline at a specific point in the Timeline.<br>
The ObjTweenable tween will start at the specified position
```javascript
// Add the ObjTweenable to the timeline at the 300ms position.
timeline.add(ObjTweenable, 300);
```

#### Timeline.seek(millisecond)
Move the current state to a specific point in the Timeline tween's timeline. <br>
For each ObjTweenable intersecting at the point, apply the properties in the ObjTweenable's tween to it's respective element.
```javascript
// Move the pointer on the timeline to the 400ms position and
// update the Timeline's ObjTweenable objects state.
timeline.seek(400);
```

## Testing

Install [Node](http://nodejs.org) (comes with npm) and Bower (`npm install -g bower`).

From the repo root, install the project's development dependencies:

```
npm install
bower install
```

Testing relies on the Karma test-runner. If you'd like to use Karma to
automatically watch and re-run the test file during development, it's easiest
to globally install Karma and run it from the CLI.

```
npm install -g karma-cli
karma start
```

To run the tests in Firefox, just once, as CI would:

```
npm test
```
