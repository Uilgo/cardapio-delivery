export interface Produto {
	id: number;
	nome: string;
	descricao?: string;
	preco: string | number;
	precoOriginal?: string | number;
	imagem?: string;
	categoria: string;
	emPromocao?: boolean;
	destaque?: boolean;
}

export const produtos: Produto[] = [
	{
		id: 1,
		nome: "Hambúrguer Clássico",
		descricao: "Pão, carne 180g, queijo, alface, tomate e molho especial",
		preco: "25.90",
		categoria: "Hambúrgueres",
		imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
		destaque: true,
	},
	{
		id: 2,
		nome: "Pizza Margherita",
		descricao: "Molho de tomate, mussarela, manjericão e azeite",
		preco: "35.00",
		precoOriginal: "45.00",
		categoria: "Pizzas",
		imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
		emPromocao: true,
	},
	{
		id: 3,
		nome: "Refrigerante Lata",
		descricao: "Coca-Cola, Guaraná ou Fanta - 350ml",
		preco: "5.00",
		categoria: "Bebidas",
		imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400",
	},
	{
		id: 4,
		nome: "Batata Frita",
		descricao: "Porção de batatas fritas crocantes com molho",
		preco: "15.00",
		categoria: "Acompanhamentos",
		imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
	},
	{
		id: 5,
		nome: "X-Bacon",
		descricao: "Hambúrguer com bacon crocante, queijo e molho barbecue",
		preco: "22.90",
		precoOriginal: "28.90",
		categoria: "Hambúrgueres",
		imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
		emPromocao: true,
		destaque: true,
	},
	{
		id: 6,
		nome: "Pizza Calabresa",
		descricao: "Calabresa, cebola, mussarela e azeitonas",
		preco: "42.00",
		categoria: "Pizzas",
		imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
	},
	{
		id: 7,
		nome: "Suco Natural",
		descricao: "Laranja, limão ou morango - 500ml",
		preco: "8.00",
		categoria: "Bebidas",
		imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
	},
	{
		id: 8,
		nome: "Brownie",
		descricao: "Brownie de chocolate com sorvete",
		preco: "12.00",
		categoria: "Sobremesas",
		imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
	},
];
