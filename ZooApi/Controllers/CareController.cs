using Microsoft.AspNetCore.Mvc;
using ZooApi.Models;
namespace ZooApi.Controllers;
using ZooApi.Services;

[ApiController]
[Route("[controller]")]

public class CareController: ControllerBase
{
    private readonly ILogger<CareController> _logger;
    private readonly CareService _service;

    public CareController(ILogger<CareController> logger, CareService service)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet(Name = "GetCares")]
    public async Task<ActionResult<IEnumerable<Care>>> Get() 
    {
        var cares = await _service.GetAllCaresAsync();
        if (cares == null || cares.Count == 0)
        {
            return NotFound();
        }
        return Ok(cares);
    }

    [HttpGet("{id}", Name = "GetCare")]
    public async Task<ActionResult<Care>> Get(int id) 
    {
        var care = await _service.GetCareByIdAsync(id);
        if (care == null)
        {
            return NotFound();
        }
        return Ok(care);
    }
    [HttpPost(Name = "PostCare")]
    public async Task<ActionResult<Care>> Post([FromBody] Care care) 
    {
        if (care == null)
        {
            return BadRequest("Care cannot be null");
        }
        if (string.IsNullOrEmpty(care.Name) || string.IsNullOrEmpty(care.Description))
        {
            return BadRequest("Care Name and Description cannot be empty");
        }
        if (string.IsNullOrEmpty(care.Frequency))
        {
            return BadRequest("Care Frequency is required");
        }
        var createdCare = _service.AddCareAsync(care);
        if (createdCare == null)
        {
            return BadRequest("Error creating care");
        }

        return Ok(createdCare);
    }

    [HttpPut("{id}", Name = "PutCare")]
    public async Task<ActionResult<Care>> Put(int id, [FromBody] Care updatedCare) 
    {
        // var existingCare = await _context.Cares.FindAsync(id);

        var  care = await _service.UpdateCareAsync(id, updatedCare);
        if (care == null)
        {
            return NotFound();
        }
        return Ok(care);
    }

    [HttpDelete("{id}", Name = "DeleteCare")]
    public async Task<ActionResult<Care>> Delete(int id) 
    {
        var care = await _service.DeleteCareAsync(id);
        if (care == null)
        {
            return NotFound();
        }
    
        return Ok(care);
    }
}