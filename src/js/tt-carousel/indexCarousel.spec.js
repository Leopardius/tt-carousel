import jsdom from 'jsdom';
import chai from 'chai';
import Slider from './indexCarousel';

global.document = jsdom.jsdom('<!DOCTYPE html><head></head><html><body></body></html>');
global.window = document.defaultView;
global.window.document = global.document;

chai.expect();
const expect = chai.expect;
let slider;

describe('Tests for Tt class', () => {
  
  before(() => {
    window.innerWidth = 750;

    let container = document.createElement('div');
    container.className = 'team__carousel';

    slider = new Slider({
      initiate: false,
      container: document.querySelector('.team__carousel'),
      infinite: true,
      responsive: [
        {
          breakpoint: 768
        },
        {
          breakpoint: 700
        }
      ]
    });
  });

  describe('#_chooseResponsiveSettings', () => {
    
    describe('window.innerWidth = 750', () => {
      before(() => {
        window.innerWidth = 750;
      });

      it('Choose {breakpoint: 768}', () => {
        expect(
          slider._chooseResponsiveSettings([
            {
              breakpoint: 768
            },
            {
              breakpoint: 700
            }
          ])
        ).to.be.deep.equal({breakpoint: 768});
      });

    });
    
    describe('window.innerWidth = 500', () => {
      before(() => {
        window.innerWidth = 500;
      });

      it('Choose {breakpoint: 700}', () => {
        expect(
          slider._chooseResponsiveSettings([
            {
              breakpoint: 768
            },
            {
              breakpoint: 700
            }
          ])
        ).to.be.deep.equal({breakpoint: 700});
      });

    });

    describe('window.innerWidth = 800', () => {
      before(() => {
        window.innerWidth = 800;
      });

      it('Choose null', () => {
        expect(
          slider._chooseResponsiveSettings([
            {
              breakpoint: 768
            },
            {
              breakpoint: 700
            }
          ])
        ).to.be.null;
      });

    });



  });


});