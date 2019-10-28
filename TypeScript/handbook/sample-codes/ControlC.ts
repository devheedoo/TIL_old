// Interfaces Extending Classes
class ControlC {
  private state: any;
}

interface SelectableControlC extends ControlC {
  select(): void;
}

class ButtonC extends ControlC implements SelectableControlC {
  select() { }
}

class TextBoxC extends ControlC {
  select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class ImageC implements SelectableControlC {
  select() { }
}

class LocationC {

}