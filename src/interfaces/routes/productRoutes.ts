import { Router } from "express";
import { ProductController } from "../http/controllers/products/productController";

// Use cases
import { CreateProductUseCase } from "../../application/use-cases/product/CreateProductUseCase";
import { DeleteProductUseCase } from "../../application/use-cases/product/DeleteProductUseCase";
import { UpdateProductUseCase } from "../../application/use-cases/product/UpdateProductUseCase";
import { ListProductsUseCase } from "../../application/use-cases/product/ListProductsUseCase";
import { FindProductByIdUseCase } from "../../application/use-cases/product/FindProductByIdUseCase";

import { PgProductRepository } from "../../infra/repositories/PgProductRepository";
import { pool } from "../../config/pool";
import { authMiddleware } from "../middlewares/authMiddleware";

const productRoutes = Router();

// Dependencias
const productRepo = new PgProductRepository(pool);

// Use cases
const createProductUseCase = new CreateProductUseCase(productRepo);
const deleteProductUseCase = new DeleteProductUseCase(productRepo);
const updateProductUseCase = new UpdateProductUseCase(productRepo);
const listProductsUseCase = new ListProductsUseCase(productRepo);
const findProductByIdUseCase = new FindProductByIdUseCase(productRepo);

// Controller
const productController = new ProductController(
    createProductUseCase,
    deleteProductUseCase,
    updateProductUseCase,
    listProductsUseCase,
    findProductByIdUseCase
);

// Criar
productRoutes.post('/products', authMiddleware, async (req, res) => {
    await productController.create(req, res);
});
// Listar todos ou filtrar
productRoutes.get('/products', authMiddleware, async (req, res) => {
    await productController.list(req, res);
});
// Buscar pelo id
productRoutes.get('/products/:id', authMiddleware, async (req, res) => {
    await productController.findById(req, res);
});
// Atualizar produto
productRoutes.put('/products/:id', authMiddleware, async (req, res) => {
    await productController.update(req, res);
});
// Deletar produto
productRoutes.delete('/products/:id', authMiddleware, async (req, res) => {
    await productController.delete(req, res);
});

console.log('🟢 products routes Ok');

export default productRoutes;
