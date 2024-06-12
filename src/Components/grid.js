import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { cloneElement, memo, useEffect, useRef } from "react";

GridRecord.propTypes = {
  record: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }),
};

function GridRecord({ record, toggleActive, index }) {
  return (
    <tr>
      <th>{record.firstName}</th>
      <th>{record.lastName}</th>
      <th>
        <input
          type="checkbox"
          checked={record.active}
          onChange={() => toggleActive(index)}
        />
      </th>
    </tr>
  );
}

const MemoGridRecord = memo(GridRecord);

export function GridComponent({ children }) {
  const dispatch = useDispatch();
  let toggleActive = (index) => {
    dispatch({
      type: "TOGGLE_ACTIVE",
      value: index,
    });
  };

  function handleFilterChange(e) {
    let value = e.target.value;
    dispatch({
      type: "FILTER",
      value,
    });
  }

  const records = useSelector((state) => state.grid.records);
  const filter = useSelector((state) => state.grid.filter);
  let gridRecords = records.filter((record) =>
    record.firstName.toUpperCase().includes(filter.toUpperCase())
  );

  let recordsGrid = gridRecords.map((record, index) => {
    return (
      <MemoGridRecord
        record={record}
        key={index}
        index={index}
        toggleActive={() => toggleActive(index)}
      />
    );
  });

  let filterInput = useRef(null);
  useEffect(() => {
    filterInput.current.focus();
  }, []);

  return (
    <div style={{ width: 300, height: 300, padding: 20 }}>
      <p>
        <input
          type="text"
          ref={filterInput}
          placeholder="Filter by..."
          onChange={handleFilterChange}
        />
      </p>
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{recordsGrid}</tbody>
      </table>
      <div>{children && cloneElement(children, { records: records })}</div>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     records: state.grid,
//   };
// }

// export default connect(mapStateToProps)(GridComponent);
