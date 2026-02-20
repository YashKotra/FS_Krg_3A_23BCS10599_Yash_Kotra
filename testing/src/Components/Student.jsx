const Student = ({ name, age, section }) => {
  return (
    <div data-testid="student-container">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Section: {section}</p>
    </div>
  );
};

export default Student;
