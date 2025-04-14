
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { animalActions } from "@/store/animal/animalSlice";
import { X } from "lucide-react";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast
} from "@/components/ui";
import {Animal, Care} from "@/models";
import { format } from "date-fns";
import { Pencil, Plus, Trash } from "lucide-react";
import {careActions} from "@/store/care/careSlice.ts";

const habitats = [
  "Savanna", "Rainforest", "Desert", "Ocean", "Arctic",
  "Mountains", "Wetlands", "Grasslands", "Forest"
];

const Animals = () => {
  const dispatch = useAppDispatch();
  const { animals, loading, error } = useAppSelector(state => state.animal);
  const { cares } = useAppSelector(state => state.care);
  const [inputValue, setInputValue] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);

  const [addedCares, setAddedCares] = useState<Care[]>([]);

  const filteredCares:Care[] =  cares.filter(
      (care:Care) => care.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) &&
  !addedCares.find((c:Care) => c.id === care.id ));

  const addCare = (care:Care) => {
    setAddedCares([...addedCares, care]);
    setInputValue("");
  }

  const removeCare = (id: number) => {
    setAddedCares(addedCares.filter((care:Care) => care.id !== id));
  };


  const [formValues, setFormValues] = useState<{
    name: string;
    description: string;
    birthDate: string;
    species: string;
    habitat: string;
    countryOfOrigin: string;
    cares: Care[];
  }>({
    name: "",
    description: "",
    birthDate: "",
    species: "",
    habitat: "",
    countryOfOrigin: "",
    cares: []
  });

  useEffect(() => {
    dispatch(animalActions.fetchAnimalsRequest());
    dispatch(careActions.fetchCaresRequest());
  }, [dispatch]);

  const openCreateDialog = () => {
    setFormValues({
      name: "",
      description: "",
      birthDate: "",
      species: "",
      habitat: "",
      countryOfOrigin: "",
      cares: []
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (animal: Animal) => {
    setFormValues({
      name: animal.name,
      description: animal.description,
      birthDate: format(new Date(animal.birthDate), "yyyy-MM-dd"),
      species: animal.species,
      habitat: animal.habitat,
      countryOfOrigin: animal.countryOfOrigin,
      cares: []
    });
    setCurrentAnimal(animal);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this animal?")) {
      dispatch(animalActions.deleteAnimalRequest(id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.species || !formValues.birthDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode && currentAnimal) {
      dispatch(animalActions.updateAnimalRequest({
        id: currentAnimal.id,
        name: formValues.name,
        description: formValues.description,
        birthDate: formValues.birthDate,
        species: formValues.species,
        habitat: formValues.habitat,
        countryOfOrigin: formValues.countryOfOrigin,
        cares: addedCares
      }));
    } else {
      dispatch(animalActions.createAnimalRequest({
        name: formValues.name,
        description: formValues.description,
        birthDate: formValues.birthDate,
        species: formValues.species,
        habitat: formValues.habitat,
        countryOfOrigin: formValues.countryOfOrigin,
        cares: addedCares
      }));
    }

    setIsDialogOpen(false);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Animal Management</h1>
        <Button
          onClick={openCreateDialog}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Animal
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Habitat</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {animals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No animals found
                  </TableCell>
                </TableRow>
              ) : (
                animals.map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell className="font-medium">{animal.name}</TableCell>
                    <TableCell>{animal.species}</TableCell>
                    <TableCell>{calculateAge(animal.birthDate)} years</TableCell>
                    <TableCell>{animal.habitat}</TableCell>
                    <TableCell>{animal.countryOfOrigin}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(animal)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(animal.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Animal" : "Add New Animal"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                  id="name"
                  value={formValues.name}
                  onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                  placeholder="Animal name"
                  required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species*</Label>
              <Input
                  id="species"
                  value={formValues.species}
                  onChange={(e) => setFormValues({...formValues, species: e.target.value})}
                  placeholder="Species"
                  required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date*</Label>
              <Input
                  id="birthDate"
                  type="date"
                  value={formValues.birthDate}
                  onChange={(e) => setFormValues({...formValues, birthDate: e.target.value})}
                  required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                  id="description"
                  value={formValues.description}
                  onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                  placeholder="Animal description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="habitat">Habitat</Label>
              <Select
                  value={formValues.habitat}
                  onValueChange={(value) => setFormValues({...formValues, habitat: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select habitat"/>
                </SelectTrigger>
                <SelectContent>
                  {habitats.map(habitat => (
                      <SelectItem key={habitat} value={habitat}>{habitat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryOfOrigin">Country of Origin</Label>
              <Input
                  id="countryOfOrigin"
                  value={formValues.countryOfOrigin}
                  onChange={(e) => setFormValues({...formValues, countryOfOrigin: e.target.value})}
                  placeholder="Country of origin"
              />
            </div>


            <div className="space-y-2 relative">
              <Label htmlFor="cares">Cares</Label>
              <div className="flex flex-wrap gap-2 border p-2 rounded-md min-h-[48px]">
                {addedCares.map((care:Care, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {care.name}
                      <button
                          type="button"
                          onClick={() => removeCare(care.id)}
                          className="ml-1 text-blue-500 hover:text-red-600"
                      >
                        <X className="w-3 h-3"/>
                      </button>
                    </div>
                ))}
                <Input
                    id="cares"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a care..."
                    className="border-none p-0 focus:ring-0 w-auto flex-grow min-w-[120px]"
                />
              </div>

              {inputValue && filteredCares.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
                    {filteredCares.map((care, idx) => (
                        <li
                            key={idx}
                            onClick={() => addCare(care)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          {care.name}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Animals;
