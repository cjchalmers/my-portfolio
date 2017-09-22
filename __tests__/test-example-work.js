import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work.js';

const myWork = [
  {
    'title': "Work Example",
    'image': {
      'desc': "example screenshot of a project involving code",
      'src': "images/example1.png",
      'comment': ""
    }
  },
  {
    'title': "Portfolio Example",
    'image': {
      'desc': "example screenshot of a project involving chemistry",
      'src': "images/example2.png",
      'comment': ""
    }
  }
];

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work= {myWork} />);

  it("Should be a 'span' element", () => {
    expect(component.type()).toEqual('span');
  });

  it("Should contain as many children as there are work examples", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });

  it("Should allow the modal to open and close", () => {
    component.instance().openModal();
    expect(component.instance().state.modalOpen).toBe(true);
    component.instance().closeModal();
    expect(component.instance().state.modalOpen).toBe(false);
  });
});

describe("ExampleWorkBubble component", () => {
  let mockOpenModalFn = jest.fn();

  let component = shallow(<ExampleWorkBubble example = {myWork[1]} openModal={mockOpenModalFn}/>);
  let images = component.find("img");

  it("Should contain a single image", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have set image correctly", () => {
    expect(images.node.props.src).toEqual(myWork[1].image.src);
  });

  it("Should call openModal when called", () => {
    component.find(".section__exampleWrapper").simulate("click");
    expect(mockOpenModalFn).toHaveBeenCalled();
  });
});
