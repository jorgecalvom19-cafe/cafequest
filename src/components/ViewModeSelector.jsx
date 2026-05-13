function ViewModeSelector({ viewDays, setViewDays }) {
  const options = [1, 3, 5, 7]

  return (
    <div className="view-mode-selector">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={
            viewDays === option
              ? 'view-mode-button active'
              : 'view-mode-button'
          }
          onClick={() => setViewDays(option)}
        >
          {option} día{option > 1 ? 's' : ''}
        </button>
      ))}
    </div>
  )
}

export default ViewModeSelector