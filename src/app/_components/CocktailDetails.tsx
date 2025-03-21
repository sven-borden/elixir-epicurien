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
import type { Cocktail } from "~/server/db/schema";
import Image from "next/image";

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
          <Carousel
            placeholder={undefined}
            className="rounded-xl"
            prevArrow={({ handlePrev }) => (
              <button
                onClick={handlePrev}
                className="!absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-500/70 p-2 text-white shadow-md transition-all hover:bg-purple-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
            nextArrow={({ handleNext }) => (
              <button
                onClick={handleNext}
                className="!absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-500/70 p-2 text-white shadow-md transition-all hover:bg-purple-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          >
            {/* Slide 1: Cocktail header only */}
            <div className="px-4 py-4">
              <Card className="w-full flex-col md:flex-row shadow-lg" placeholder={undefined}>
                {cocktail.image && (
                  <CardHeader
                    placeholder={undefined}
                    className="m-0 w-full h-48 md:h-auto md:w-2/5 shrink-0 rounded-b-none md:rounded-b-lg md:rounded-r-none"
                  >
                    <Image
                      src={cocktail.image}
                      alt={cocktail.name}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                )}
                <CardBody placeholder={undefined} className="p-4">
                  <Typography
                    variant="h4"
                    color="purple"
                    className="mb-2"
                    placeholder={undefined}
                  >
                    {cocktail.name}
                  </Typography>
                  <Typography
                    color="gray"
                    className="mb-4"
                    variant="paragraph"
                    placeholder={undefined}
                  >
                    {cocktail.description}
                  </Typography>
                </CardBody>
              </Card>
            </div>

            {/* Slide 2: Ingredients only */}
            <div className="p-8">
              <Typography
                variant="h4"
                color="deep-purple"
                className="mb-4"
                placeholder={undefined}
              >
                Ingredients
              </Typography>
              <ul className="list-inside list-disc text-gray-900">
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-2 text-lg">{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Slide 3: Recipe only */}
            <div className="p-8">
              <Typography
                variant="h4"
                color="deep-purple"
                className="mb-4"
                placeholder={undefined}
              >
                Recipe
              </Typography>
              <ol className="list-inside list-decimal text-gray-900">
                {cocktail.instructions.map((instruction, index) => (
                  <li key={index} className="mb-3 text-lg">{instruction}</li>
                ))}
              </ol>
            </div>
          </Carousel>
        )}
      </DialogHeader>
    </Dialog>
  );
};

export default CocktailDetails;
