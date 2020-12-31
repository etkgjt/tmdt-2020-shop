/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../styles/forAll.css';
import { Input } from 'reactstrap';
export default function SearchBar({
	onUnfocusFunc = () => {},
	onSubmitFunc = () => {},
}) {
	return (
		<Autocomplete
			id="combo-box-demo"
			options={top100Films}
			getOptionLabel={(option) => option.title}
			style={{ width: '700px' }}
			onSubmit={() => console.log('AutoComplete submit')}
			onBlur={() => onUnfocusFunc()}
			onChange={(e) => onSubmitFunc(e?.target?.value)}
			freeSolo
			blurOnSelect
			renderInput={(params) => (
				<TextField
					autoFocus
					{...params}
					label="Tìm kiếm"
					variant="filled"
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '5px',
					}}
					className="search_bar"
					onBlur={() => onUnfocusFunc()}
					onSubmit={(e) => console.log('submit ne')}
				/>
			)}
		/>

		// <Input type="text" className="search_bar" />
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'iphone 7', year: 1994 },
	{ title: 'macbook', year: 1972 },
	{ title: 'asus vivo book', year: 1974 },
	{ title: 'banh trang', year: 2008 },
	{ title: 'samsung note 8', year: 1957 },
	{ title: 'xiaomi', year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
	{ title: 'Forrest Gump', year: 1994 },
	{ title: 'Inception', year: 2010 },
	{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: 'Goodfellas', year: 1990 },
	{ title: 'The Matrix', year: 1999 },
];
