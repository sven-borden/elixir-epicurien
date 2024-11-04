import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Carousel,
} from "@material-tailwind/react";
import Dialog, {
  DialogHeader,
} from "@material-tailwind/react/components/Dialog";
import { Cocktail } from "../Interfaces/Cocktail";

interface CocktailDetailsProps {
  cocktail: Cocktail;
  onClose: () => void;
  open: boolean;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = ({
  cocktail,
  onClose,
  open,
}) => {
  return (
    <Dialog
      open={open}
      size="md"
      handler={onClose}
      className="rounded-3xl bg-gradient-to-b from-gray-200 to-purple-50 text-gray-900"
      placeholder={undefined}
    >
      <DialogHeader className="m-0 justify-between p-0" placeholder={undefined}>
        {cocktail && (
          <Carousel placeholder={undefined}>
            {/* Cocktail header */}
            <Card className="w-full flex-row shadow-lg" placeholder={undefined}>
              {cocktail.image && (
                <CardHeader
                  placeholder={undefined}
                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                  <img
                    src={cocktail.image}
                    alt="card-image"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
              )}
              <CardBody placeholder={undefined}>
                <Typography
                  variant="h3"
                  color="purple"
                  className="mb-2"
                  placeholder={undefined}
                >
                  {cocktail.name}
                </Typography>
                <Typography
                  color="gray"
                  className="mb-8"
                  variant="paragraph"
                  placeholder={undefined}
                >
                  {cocktail.description}
                </Typography>
              </CardBody>
            </Card>

            {/* Ingredient card */}
            <div className="ml-16 mt-8 items-center">
              <Typography
                variant="h4"
                color="deep-purple"
                className="mb-2"
                placeholder={undefined}
              >
                Ingredients
              </Typography>
              <ul className="list-inside list-disc text-gray-900">
                <Typography variant="paragraph" placeholder={undefined}>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </Typography>
              </ul>
            </div>

            {/* Recipe card */}
            <div className="ml-16 mt-8 items-center">
              <Typography
                variant="h4"
                color="deep-purple"
                className="mb-2"
                placeholder={undefined}
              >
                Recipe
              </Typography>
              <ol className="list-inside list-decimal text-gray-900">
                <Typography variant="paragraph" placeholder={undefined}>
                  {cocktail.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </Typography>
              </ol>
            </div>
          </Carousel>
        )}
      </DialogHeader>
    </Dialog>
  );
};

export default CocktailDetails;
