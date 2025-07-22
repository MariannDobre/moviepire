import GenreFilter from './GenreFilter';
import TypeFilter from './TypeFilter';
import YearFilter from './YearFilter';

export default function FilterPanel({
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  selectedYearRange,
  setSelectedYearRange,
}) {
  return (
    <div className='w-full h-auto flex items-center gap-3 md:gap-6'>
      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <TypeFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <YearFilter
        selectedYearRange={selectedYearRange}
        setSelectedYearRange={setSelectedYearRange}
      />
    </div>
  );
}
