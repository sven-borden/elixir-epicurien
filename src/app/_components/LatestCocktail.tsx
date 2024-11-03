"use client";

import { useCocktail } from '~/app/_contexts/CocktailContext';
import { Card, CardHeader, CardBody, Typography, Button, List, ListItem} from '@material-tailwind/react';

export function LatestCocktail() {
  const { latestCocktail } = useCocktail();

  if (!latestCocktail) {
    return null;
  }

  return (
    <Card className="w-full max-w-[48rem] flex-row" placeholder={undefined}>
      {latestCocktail.image && (
      <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none" placeholder={undefined} >
        <img
          src={latestCocktail.image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      )}
      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {latestCocktail.name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {latestCocktail.description}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Ingredients
        </Typography>
        <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {latestCocktail.ingredients.map((ingredient, index) => (
            <ListItem key={index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{ingredient}</ListItem>
          ))}
        </List>
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
    </Card>

    // <div className="max-w-128 p-4 rounded shadow bg-dark-purple text-white flex">
    //   {latestCocktail.image && (
    //     <div className="w-1/2 pr-4">
    //       <img src={latestCocktail.image} alt={latestCocktail.name} className="w-full h-auto mb-4 rounded" />
    //     </div>
    //   )}
    //   <div className="w-1/2 pl-4">
    //     <h2 className="text-xl font-bold text-white">{latestCocktail.name}</h2>
    //     <p className="text-gray-300 mb-4">{latestCocktail.description}</p>
    //     <h3 className="text-lg font-semibold text-white">Ingredients:</h3>
    //     <ul className="list-disc list-inside mb-4 text-gray-300">
    //       {latestCocktail.ingredients.map((ingredient, index) => (
    //         <li key={index}>{ingredient}</li>
    //       ))}
    //     </ul>
    //     <h3 className="text-lg font-semibold text-white">Instructions:</h3>
    //     <ol className="list-decimal list-inside mb-4 text-gray-300">
    //       {latestCocktail.instructions.map((instruction, index) => (
    //         <li key={index}>{instruction}</li>
    //       ))}
    //     </ol>
    //   </div>
    // </div>
  );
}
