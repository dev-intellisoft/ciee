
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { careActions } from "@/store/care/careSlice";
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
import { Pencil, Plus, Trash } from "lucide-react";
import { type Care as CareType } from "@/models";  // Type-only import to resolve conflict

const Care = () => {
  const dispatch = useAppDispatch();
  const { cares, loading, error } = useAppSelector(state => state.care);

  // State for the create/edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCare, setCurrentCare] = useState<CareType | null>(null);

  // Form state
  const [formValues, setFormValues] = useState<{
    name: string;
    description: string;
    frequency: string;
  }>({
    name: "",
    description: "",
    frequency: "daily"
  });

  useEffect(() => {
    dispatch(careActions.fetchCaresRequest());
  }, [dispatch]);

  const openCreateDialog = () => {
    setFormValues({
      name: "",
      description: "",
      frequency: "daily"
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (care: CareType) => {
    setFormValues({
      name: care.name,
      description: care.description,
      frequency: care.frequency
    });
    setCurrentCare(care);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this care?")) {
      dispatch(careActions.deleteCareRequest(id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Make sure form is valid
    if (!formValues.name || !formValues.frequency) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode && currentCare) {
      dispatch(careActions.updateCareRequest({
        id: currentCare.id,
        name: formValues.name,
        description: formValues.description,
        frequency: formValues.frequency
      }));
    } else {
      dispatch(careActions.createCareRequest({
        name: formValues.name,
        description: formValues.description,
        frequency: formValues.frequency
      }));
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Animal Care Management</h1>
        <Button
          onClick={openCreateDialog}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Care
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
                <TableHead>Description</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cares.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No care records found
                  </TableCell>
                </TableRow>
              ) : (
                cares.map((care) => (
                  <TableRow key={care.id}>
                    <TableCell className="font-medium">{care.name}</TableCell>
                    <TableCell>{care.description}</TableCell>
                    <TableCell>{care.frequency}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(care)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(care.id)}
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
              {isEditMode ? "Edit Care" : "Add New Care"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                placeholder="Care name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formValues.description}
                onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                placeholder="Care description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency*</Label>
              <Select
                value={formValues.frequency}
                onValueChange={(value) => setFormValues({...formValues, frequency: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
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

export default Care;
