/**
 * Created by kunee on 22/04/2019.
 */
import Autosuggest from 'react-autosuggest';
import React from 'react';


class AutoSuggest extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    componentDidMount() {
        if(this.props.value)
            this.setState({value: this.props.value })
    }

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <span>
            {suggestion}
        </span>);

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.data.filter(item =>
            item.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
        this.props.handleChange(this.state.value);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
        this.props.handleChange(this.state.value);

    };

    render() {
        const {suggestions, value} = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default AutoSuggest;