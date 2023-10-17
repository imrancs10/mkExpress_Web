import { useEffect, useRef, useState } from "react";
import './dropdown.css'
import { common } from "../../Utility/common";

const SearchableDropdown = ({
  options,
  elementKey,
  elementValue,
  id,
  value,
  name,
  handleChange,
  defaultText,
  defaultValue
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [navigateIndex, setNavigateIndex] = useState(0);
  const inputRef = useRef(null);
  defaultText = common.defaultIfEmpty(defaultText, "Select option...");
  defaultValue = common.defaultIfEmpty(defaultText, "");
  value = common.defaultIfEmpty(value, defaultText);
  elementKey = common.defaultIfEmpty(elementKey, "id");
  elementValue = common.defaultIfEmpty(elementValue, "value");
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange({
      target: {
        name: name,
        value: option[elementKey],
        type: 'select-one'
      }
    });
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
    //setNavigateIndex(!isOpen?-1:navigateIndex);
  }

  const getDisplayValue = () => {
    if (query) return query;
    var val = options?.find(x => x[elementKey] === value);
    if (value) return val === undefined ? "" : val[elementValue];

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[elementValue].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  const navigateList = (e) => {
    var keyCode = e.keyCode; //38-KeyUp,40-KeyDown,13-enter,8-backspace
    if (keyCode === 38) {
      if (navigateIndex > 0)
        setNavigateIndex(pre => pre - 1)
      else
        setNavigateIndex(0);
    }
    if (keyCode === 40) {
      if (!isOpen) {
        setIsOpen(true);
      }
      if (navigateIndex < options?.length - 1)
        setNavigateIndex(pre => pre + 1)
      else
        setNavigateIndex(options?.length - 1);
    }
    if (keyCode === 13) {
      setQuery(() => "");
      handleChange({
        target: {
          name: name,
          value: options[navigateIndex][elementKey],
          type: 'select-one'
        }
      });
      setIsOpen((isOpen) => !isOpen);
    }
    if (keyCode === 8 && e.repeat) {
      setQuery(() => "");
      handleChange({
        target: {
          name: name,
          value: "",
          type: 'select-one'
        }
      });
      setIsOpen((isOpen) => !isOpen);
    }
  }
  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            onK={e => { navigateList(e) }}
            onKeyDown={e => { navigateList(e) }}
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange({
                target: {
                  name: name,
                  value: defaultValue,
                  type: 'select-one'
                }
              });
            }}
            onClick={toggle}
            className=" form-control  form-control-sm"
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${index === navigateIndex ? "navigated " : ""} ${option[elementKey] === value ? "selected" : ""}`}
              key={`${id}-${index}`}
            >
              {option[elementValue]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
