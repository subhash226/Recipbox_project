import React from "react";
import { useParams } from "react-router-dom";
import AddRecipePage from "./AddRecipePage";

export default function EditRecipe() {
	const { id } = useParams();
	return <AddRecipePage recipeId={id} />;
}