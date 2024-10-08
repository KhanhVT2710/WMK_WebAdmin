import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { recipeApi } from "@/features";
import Show from "@/lib/show";
import { RecipeRequest } from "@/models/requests";
import { Response } from "@/models/responses";
import { RecipeList } from "@/models/responses/recipe_list";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleMinus,
  MoreHorizontal,
  NotebookTabs,
  PencilLine,
  ScanEye,
  Trash2,
} from "lucide-react";

const RecipeColumn = (
  refetch: () => void,
  handleEdit: (recipe: RecipeRequest) => void,
  handleToast: (success: boolean, description: string) => void,
  handleDetail: (id: string) => void
): ColumnDef<RecipeList>[] => [
  {
    header: "No.",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.img}
          alt={row.original.name}
          className="object-cover rounded-md size-32"
        />
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "recipeCategories",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 px-2 text-center">
          {row.original.recipeCategories.map((category) => (
            <Badge
              key={category.id}
              className="text-center text-blue-800 bg-blue-100 text-nowrap"
            >
              {category.category.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "price",
    header: "Price (VNĐ)",
  },

  {
    accessorKey: "servingSize",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serving Size (person)
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-left">{row.original.servingSize} person</span>
      );
    },
  },
  {
    accessorKey: "cookingTime",
    header: "Time (minutes)",
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "popularity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Popularity
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },

  {
    accessorKey: "processStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.processStatus.toLowerCase();

      if (status === "approved") {
        return <Badge variant="success">Approved</Badge>;
      }

      if (status === "processing") {
        return (
          <Badge className="text-white bg-blue-400 hover:bg-blue-400 hover:text-white">
            Processing
          </Badge>
        );
      }

      if (status === "denied") {
        return (
          <Badge className="text-white bg-slate-600 hover:bg-slate-600 hover:text-white">
            Denied
          </Badge>
        );
      }
      if (status === "customer") {
        return (
          <Badge className="text-white bg-violet-400 hover:bg-violet-400 hover:text-white">
            Customer
          </Badge>
        );
      }

      if (status === "cancel") {
        return (
          <Badge
            variant="destructive"
            className="hover:bg-destructive hover:text-white"
          >
            Cancel
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "baseStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.baseStatus.toLowerCase();

      if (status === "available") {
        return <Badge variant="success">Available</Badge>;
      }

      return <Badge variant="destructive">Unavailable</Badge>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const recipe: RecipeList = row.original;

      const returnNumberDifficulty = (difficulty: string) => {
        if (difficulty === "Normal") {
          return 0;
        }
        if (difficulty === "Medinum") {
          return 1;
        }
        if (difficulty === "Hard") {
          return 2;
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDetail(recipe.id);
              }}
            >
              <NotebookTabs className="w-4 h-4 mr-2" />
              Detail
            </DropdownMenuItem>
            <Show>
              <Show.When
                isTrue={!(recipe.processStatus.toLowerCase() === "processing")}
              >
                <DropdownMenuItem
                  onClick={async () => {
                    const result: Response<null> =
                      await recipeApi.changeBaseStatusRecipe(
                        recipe.id,
                        recipe.baseStatus.toLocaleLowerCase() === "unavailable"
                          ? 0
                          : 1
                      );

                    if (result.statusCode === 200) {
                      handleToast(true, result.message);
                      refetch();
                    } else {
                      handleToast(false, result.message);
                    }
                  }}
                >
                  <Show>
                    <Show.When
                      isTrue={
                        recipe.baseStatus.toLocaleLowerCase() === "unavailable"
                      }
                    >
                      <ScanEye className="w-4 h-4 mr-2" />
                      Available
                    </Show.When>
                    <Show.Else>
                      <CircleMinus className="w-4 h-4 mr-2" />
                      Unavailable
                    </Show.Else>
                  </Show>
                </DropdownMenuItem>
              </Show.When>
            </Show>

            <DropdownMenuItem
              onClick={() => {
                handleEdit({
                  id: recipe.id,
                  name: recipe.name,
                  description: recipe.description,
                  recipeIngredientsList: recipe.recipeIngredients.map(
                    (ingredient) => {
                      return {
                        ingredientId: ingredient.ingredientId,
                        amount: ingredient.amount,
                      };
                    }
                  ),
                  img: recipe.img,
                  servingSize: recipe.servingSize,
                  cookingTime: recipe.cookingTime,
                  difficulty: returnNumberDifficulty(
                    recipe.difficulty
                  ) as number,
                  categoryIds: recipe.recipeCategories.map(
                    (category) => category.categoryId
                  ),
                  steps: recipe.recipeSteps.map((step) => {
                    return {
                      id: step.id,
                      index: step.index,
                      name: step.name,
                      mediaURL: step.imageLink,
                      description: step.description,
                      imageLink: step.imageLink,
                    };
                  }),
                });
              }}
            >
              <PencilLine className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const result = await recipeApi.deleteRecipe(recipe.id);

                if (!result) {
                  handleToast(false, "Delete recipe failed");
                  refetch();
                }
                handleToast(true, "Delete recipe successfully");
                refetch();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Detele
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default RecipeColumn;
