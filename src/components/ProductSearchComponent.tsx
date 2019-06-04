import Autosuggest from 'react-autosuggest';
import './SearchComponentTheme.css';
import * as React from "react";

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str: any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value: any) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion: any) {
  return suggestion.name;
}

function renderSuggestion(suggestion: any) {
  return (
    <span>{suggestion.name}</span>
  );
}


type MyState = {
  value: string,
  suggestions: any
};


type MyProps = {
};

class ProductSearchComponent extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  };


  render() {
    const { value, suggestions } = this.state;

    const onChange = (event: any, { newValue, method }: { newValue: any, method: any }) => {
      this.setState({
        value: newValue
      });
    };

    const onSuggestionsFetchRequested = ({ }) => {
      fetch(`/api/products?page=0&size=5&sort=&keyword=${value.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let suggestions = [];
          if (Array.isArray(data.content)) {
            suggestions = data.content;
          }

          this.setState({ suggestions: suggestions })
        });
    };

    const onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    const onSuggestionSelected = (event: any, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }: { suggestion: any, suggestionValue: any, suggestionIndex: any, sectionIndex: any, method: any }) => {
      location.href = `/products/${suggestion.id}`;
    };

    const inputProps = {
      placeholder: "Search products",
      value,
      onChange: onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default ProductSearchComponent;