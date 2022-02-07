import { useEffect, useState, useCallback } from 'react';
import github from './db';
import query from './Query';
import RepoInfo from './RepoInfo';

function App() {
	let [userName, setUserName] = useState('');
	const [repoList, setRepoList] = useState(null);

	const fetchData = useCallback(() => {
		fetch(github.baseURL, {
			method: 'POST',
			headers: github.headers,
			body: JSON.stringify(query),
		})
			.then((response) => response.json())
			.then((data) => {
				const viewer = data.data.viewer;
				const repos = data.data.search.nodes;
				setUserName(viewer.name);
				setRepoList(repos);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className='App container mt-5'>
			<h1 className='text-primary'>
				<i className='bi bi-diagram-2-fill'>Repos</i>
			</h1>
			<p>Hi there {userName}</p>
			{repoList && (
				<ul className='list-group list-group-flush'>
					{repoList.map((repo) => (
						<RepoInfo key={repo.id} repo={repo} />
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
