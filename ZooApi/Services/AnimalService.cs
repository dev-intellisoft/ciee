using ZooApi.Models;
using ZooApi.Data;
using Microsoft.EntityFrameworkCore;

namespace ZooApi.Services
{
    public class AnimalService {
    private readonly ZooContext _context;

    public AnimalService(ZooContext context)
    {
        _context = context;
    }

    public async Task<List<Animal>> GetAllAnimalsAsync()
    {
        var animals =  _context.Animals.Select(a => new Animal
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description,
            BirthDate = a.BirthDate,
            Species = a.Species,
            Habitat = a.Habitat,
            CountryOfOrigin = a.CountryOfOrigin,
            Cares = _context.AnimalCares
                .Where(ac => ac.AnimalId == a.Id)
                .Select(ac => new Care
                {
                    Id = ac.CareId,
                    Name = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Name,
                    Description = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Description,
                    Frequency = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Frequency
                }).ToList()
        }).ToListAsync().Result;

        return animals;
    }

    public async Task<Animal> GetAnimalByIdAsync(int id)
    {
        var animal =  _context.Animals.Select(a => new Animal
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description,
            BirthDate = a.BirthDate,
            Species = a.Species,
            Habitat = a.Habitat,
            CountryOfOrigin = a.CountryOfOrigin,
            Cares = _context.AnimalCares
                .Where(ac => ac.AnimalId == a.Id)
                .Select(ac => new Care
                {
                    Id = ac.CareId,
                    Name = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Name,
                    Description = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Description,
                    Frequency = _context.Cares.FirstOrDefault(c => c.Id == ac.CareId).Frequency
                }).ToList()
        }).FirstOrDefaultAsync(a => a.Id == id).Result;

        return animal;
    }
    public async Task<Animal> AddAnimalAsync(Animal animal)
    {
          var cares = animal.Cares;
        animal.Cares = new List<Care>();

        _context.Animals.Add(animal);
        _context.SaveChanges();

        foreach (var care in cares)
        {
            _context.AnimalCares.Add(new AnimalCare
            {
                AnimalId = animal.Id,
                CareId = care.Id
            });
            _context.SaveChanges();
        }
        return animal;
    }
    public async Task<Animal> UpdateAnimalAsync(int id, Animal updatedAnimal)
    {
        var  existingAnimal = await _context.Animals.FindAsync(id);
        if (existingAnimal == null)
        {
            return null;
        }

        existingAnimal.Name = updatedAnimal.Name;
        existingAnimal.Description = updatedAnimal.Description;
        existingAnimal.BirthDate = updatedAnimal.BirthDate;
        existingAnimal.Species = updatedAnimal.Species;
        existingAnimal.Habitat = updatedAnimal.Habitat;
        existingAnimal.CountryOfOrigin = updatedAnimal.CountryOfOrigin;

        if (updatedAnimal.Cares != null && updatedAnimal.Cares.Count > 0)
        {
            var animalCaresToRemove = _context.AnimalCares.Where(ac => ac.AnimalId == id);
            _context.AnimalCares.RemoveRange(animalCaresToRemove);
            foreach (var care in updatedAnimal.Cares)
            {
                _context.AnimalCares.Add(new AnimalCare
                {
                    AnimalId = id,
                    CareId = care.Id
                });
            }
        }
        
        await _context.SaveChangesAsync();
        return await GetAnimalByIdAsync(id);
    }
    public async Task<Animal> DeleteAnimalAsync(int id)
    {
        var  animal = await _context.Animals.FindAsync(id);
        _context.Animals.Remove(animal);
        await _context.SaveChangesAsync();
        return animal;
    }
    public async Task<bool> AnimalExistsAsync(int id)
    {
        return await _context.Animals.AnyAsync(a => a.Id == id);
    }
}

}
