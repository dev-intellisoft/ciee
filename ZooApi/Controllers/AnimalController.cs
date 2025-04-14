using Microsoft.AspNetCore.Mvc;
using ZooApi.Models;
using ZooApi.Services;
namespace ZooApi.Controllers;

[ApiController]
[Route("[controller]")]

public class AnimalController: ControllerBase
{
    private readonly ILogger<AnimalController> _logger;
    private readonly AnimalService _service;
    public AnimalController(AnimalService service, ILogger<AnimalController> logger) 
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet(Name = "GetAnimals")]
    public async Task<ActionResult<IEnumerable<Animal>>> Get() 
    {
        var animals = await _service.GetAllAnimalsAsync();

        if (animals == null || animals.Count == 0)
        {
            return new List<Animal>();
        }

        return Ok(animals);
    }

     [HttpGet("{id}", Name = "GetAnimal")]
    public async Task<ActionResult<Animal>> Get(int id) 
    {
        var animal = await _service.GetAnimalByIdAsync(id);
        if (animal == null)
        {
            return NotFound();
        }
        return Ok(animal);
    }

    [HttpPost(Name = "PostAnimal")]
    public async Task<ActionResult<Animal>> Post([FromBody] Animal animal) 
    {
        if (animal == null)
        {
            return BadRequest("Animal cannot be null");
        }
        if (string.IsNullOrEmpty(animal.Name) || string.IsNullOrEmpty(animal.Description))
        {
            return BadRequest("Animal Name and Description cannot be empty");
        }
        if (animal.BirthDate == default(DateTime))
        {
            return BadRequest("Animal BirthDate is required");
        }
        if (string.IsNullOrEmpty(animal.Species) || string.IsNullOrEmpty(animal.Habitat) || string.IsNullOrEmpty(animal.CountryOfOrigin))
        {
            return BadRequest("Animal Species, Habitat and CountryOfOrigin cannot be empty");
        }

        if (animal.Id != 0)
        {
            return BadRequest("Animal Id should be 0 for new animals");
        }
        if (animal.BirthDate > DateTime.Now)
        {
            return BadRequest("Animal BirthDate cannot be in the future");
        }


        var createdAnimal = await _service.AddAnimalAsync(animal);
        return Ok(createdAnimal);
    }

    [HttpPut("{id}", Name = "PutAnimal")]
    public async Task<ActionResult<Animal>> Put(int id, [FromBody] Animal updatedAnimal) 
    {
        var animal = await _service.UpdateAnimalAsync(id, updatedAnimal);
        if (animal == null)
        {
            return NotFound();
        }
        return Ok(animal);
    }

    [HttpDelete("{id}", Name = "DeleteAnimal")]
    public async Task<ActionResult<Animal>> Delete(int id) 
    {
        var animal = await _service.DeleteAnimalAsync(id);
        if (animal == null)
        {
            return NotFound();
        }
        return Ok(animal);
    }
}
