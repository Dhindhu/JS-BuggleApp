/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 * 
 * Code Review: Onyinyechi Ogbuanya
 */

 const findAllSolutions = function(grid, dictionary) {
	//let solutions = [];
	//return solutions;
	for (let i=0; i<grid.length; i++){
		for (let j=0; j<grid.length; j++){
			if (grid[i][j] === "S" || grid[i][j] === "Q") 
			{
				return [];
			}
		}
	}
	let solutions = [];
	const moves = [[-1, 0], [0, 1], [1, 0], [0, -1], [-1,-1], [-1,1], [1,-1], [1,1]];
	const upperwords = dictionary.map(word => word.toUpperCase());
	for (let i = 0; i < grid.length; i++)
	{
		for ( let j = 0; j < grid[i].length; j++)
		{
			grid[i][j] = grid[i][j].toUpperCase();
		}
	}
  

	const buildTrie = () => 
	{
		const root = {};
		for (const word of upperwords) 
		{
			let node = root;
			for (let i = 0; i < word.length; i++) 
			{
				let char = word[i];
				if (char === "Q")
				{
					char = "QU";
					i++;
				}
				if (char === "S")
				{
					char = "ST";
					i++;
				}
				if (node[char] == null) node[char] = {};
				node = node[char];
			}
			node.upperwords = word;
		}
		return root;
	};
   
	const search = (node, x, y) => 
	{
		if (node.upperwords != null) 
		{
			if(node.upperwords.length > 2)
			{
				solutions.push(node.upperwords);
			}
			node.upperwords = null; // no duplicate printing
		}

		if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;
		if (node[grid[x][y]] == null) return;

		const char = grid[x][y];
		grid[x][y] = "*"; // visited
		for (const [dx, dy] of moves) {
			const i = x + dx;
			const j = y + dy;
			search(node[char], i, j);
		}
		grid[x][y] = char; // Reset
	};

	const root = buildTrie();
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			search(root, i, j);
		}
	}
	return solutions;
};


export default findAllSolutions;