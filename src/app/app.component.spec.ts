import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have splitted the tweet'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input : String = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
    const output : String[]= ["1/2 I can't believe Tweeter now supports chunking", "2/2 my messages, so I don't have to do it myself."];
    app.splitString(input);
    expect(app.splitString(input)).toEqual(output);
  }));

  it(`should have splitted the tweet without error'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input : String = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
    app.splitString(input);
    expect(function(){app.splitString(input)}).not.toThrow();
  }));

  it('should return the tweet if less than 50 chars', function(){
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input : String = "It is fun doing this!!!";
    const output : String[]= ["It is fun doing this!!!"];
    expect(app.splitString(input)).toEqual(output);
  });

  it('should not return empty response', function(){
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input : String = "It is fun doing this!!!";
    expect(app.splitString(input)).not.toEqual([]);
  });

  it('should through exception if no whitespace character is found', function(){
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input : String = "adsakdnsakndsakndkasndkasndknsakdnsakdnskandsakndksandkasndksandknsakdnsakdnsakndsakndkasnd";
    const error : Error = new Error('message cannot be splitted');
    expect(function(){app.splitString(input)}).toThrow();
  })

  it('should split strings', function(){
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const input = "hi i am ashish santikari and i would like to tell you all about myself that i am good in typescript coding along with angularjs and yes now i am playing with lorem ipsum.";
    const output = [
      '1/4 hi i am ashish santikari and i would like to',
      '2/4 tell you all about myself that i am good in',
      '3/4 typescript coding along with angularjs and',
      '4/4 yes now i am playing with lorem ipsum.'
    ]
    expect(app.splitString(input)).toEqual(output);
  })
});
