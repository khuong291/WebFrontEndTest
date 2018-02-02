/*
 * 1. Implement the React.Component, <Input />
 *   - It should allow the user to type text in.
 *   - Style as you wish.
 *
 * 2. Implement the React.Component, <Output />
 *   - It should show the user the computed result from calling 'isClosed()'.
 *   - Style as you wish.
 *
 * 3. Implement the React.Component, <Button />
 *   - It should handle user's click, which will call 'isClosed()'
 *   - It should handle user's pressing 'Enter', which will also call 'isClosed()'
 *
 * 4. Implement `isClosed()`
 *   - Given a string input, `str`, write a function that returns a boolean if the `str`
 *     is properly "closed". This means we have 2 types of reserved characters:
 *     1. Opening Character, "^"
 *     2. Closing Character, "$"
 *     - The function needs to check that whenever an Opening Character appears, then a Closing
 *     Character comes after it.
 *     - Likewise, whenever a Closing Character appears, means a corresponding
 *     Opening Character must have appeared previously.
 *     - It should handle nesting, so "^^$$" should return `true`.
 *     - It should ignore other characters that is not "^" or "$".
 *   - Examples:
 *     - "^$" => true
 *     - "$^" => false
 *     - "^^$$" => true
 *     - "^$$^" => false
 *     - "^$^$" => true
 *     - "^123^abc$$" => true
 */
import React from 'react';

export function Input(props) {
  return (
    <div>
      Input
      <input type="text" value={props.value} onChange={props.onChange} onKeyPress={props.onKeyPress}/>
    </div>
  )
}

export function Button(props) {
  return (
    <div>
      <input type="button" value="Click me" onClick={props.onClick}/>
    </div>
  )
}

export function Output(props) {
  return (
    <div>
      Output 
      <input type="text" value={props.value} />
    </div>
  )
}

export function isClosed(str) {
  var count = 0
  for (var i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    if (char == '^') {
      // Opening
      count += 1
    } else if (char == "$") {
      // Closing
      count -= 1
    }

    // If negative, it means a closing $ appears before any matching ^
    if (count < 0) {
      return false
    }
  }
  
  // 0 means all opening ^ has their matching closing $
  return count == 0
}

export class ComputeIO extends React.Component {
  constructor(props) {
    super(props)
    
    // Represent input and ouput from 2 text inputs
    this.state = {
      input: '',
      output: ''
    }

    // Bind callbacks in the constructor
    this.updateInput = this.updateInput.bind(this)
    this.buttonTouched = this.buttonTouched.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  updateInput(event) {
    this.setState({
      input: event.target.value
    })
  }

  validate() {
    const result = isClosed(this.state.input) ? 'true' : 'false'
    this.setState({
      output: result
    })
  }

  buttonTouched(event) {
    this.validate()
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.validate()
    }
  }

  render() {
    return (
      <section>
        <Input value={this.state.input} onChange={this.updateInput} onKeyPress={this.handleKeyPress}/>
        <Button onClick={this.buttonTouched}/>
        <Output value={this.state.output}/>
      </section>
    );
  }
}
